/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.txt
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to a newer
 * versions in the future. If you wish to customize this module for your
 * needs please refer to CustomizationPolicy.txt file inside our module for more information.
 *
 * @author Webkul IN
 * @copyright Since 2010 Webkul
 * @license https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */

import $ from 'jquery';

/* Format the product price according to the currency */
var p, pos;
var format = [];

String.prototype.strtr = function (dic) {
    const str = this.toString(),
        makeToken = (inx) => `{{###~${inx}~###}}`,

        tokens = Object.keys(dic)
            .map((key, inx) => ({
                key,
                val: dic[key],
                token: makeToken(inx)
            })),

        tokenizedStr = tokens.reduce((carry, entry) =>
            carry.replace(entry.key, entry.token), str);

    return tokens.reduce((carry, entry) =>
        carry.replace(entry.token, entry.val), tokenizedStr);
};

export function makeTotalProductCaculation(price) {
    var roundOffValue = 100;
    if (psPrecision == 1) {
        roundOffValue = 10;
    } else if (psPrecision == 2) {
        roundOffValue = 100;
    } else if (psPrecision == 3) {
        roundOffValue = 1000;
    } else if (psPrecision == 4) {
        roundOffValue = 10000;
    } else if (psPrecision == 5) {
        roundOffValue = 100000;
    } else if (psPrecision == 6) {
        roundOffValue = 1000000;
    }
    price = Math.round(price * roundOffValue) / roundOffValue;
    return price.toFixed(psPrecision);
}

export async function getFormatPrice(price) {
    if (isNaN(price)) {
        price = 0;
    }
    price = makeTotalProductCaculation(price);
    return new Promise(resolve => {
        formatCurrencyCldr(price, function (price) {
            price = price.strtr(number_formatter);
            resolve(price);
        });
    });
}


export async function wkFormatCurrency(number, currencyFormat, invoice = false) {
    if (psVersion >= '1.7.6.0') {
        try {
            return getFormatPrice(number);
        } catch (e) {
            console.log(e);
        }
    } else {
        var patterns = currencyFormat.split(';');
        var matches = false;
        if (matches = (patterns[0] + '').match(/^(.*?)[#,\.0]+(.*?)$/)) {
            format['positive_prefix'] = matches[1];
            format['positive_suffix'] = matches[2];
        }
        if (patterns[1] != undefined && (patterns[1] + '').match(/^(.*?)[#,\.0]+(.*?)$/)) {
            format['negative_prefix'] = matches[1];
            format['negative_suffix'] = matches[2];
        } else {
            format['negative_prefix'] = '-' + format['positive_prefix'];
            format['negative_suffix'] = format['positive_suffix'];
        }
        var pat = patterns[0];
        if (pos !== false) {
            var pos2 = pat.indexOf('0');
            format['decimal_digits'] = pos2 > pos ? pos2 - pos : 0;

            var pos3 = pat.indexOf('#');
            format['max_decimal_digits'] = pos3 >= pos2 ? pos3 - pos : format['decimal_digits'];

            pat = pat.substring(0, pos);
        }

        p = pat.replace(',', '');
        pos = p.indexOf('0');

        format['integer_digits'] = pos !== -1 ? p.indexOf('0') - pos + 1 : 0;



        p = currencyFormat.replace('#', '0');
        pos = currencyFormat.indexOf(',');
        if (pos !== false) {
            format['group_size1'] = currencyFormat.indexOf('0') - pos;

            pos2 = currencyFormat.substring(0, pos).indexOf(',');
            format['group_size2'] = pos2 !== false ? pos - pos2 - 1 : 0;
        }

        var result = parseNumber(number);
        var formattedInteger = formatIntegerWithGroup(result[0], ',');

        var formattedNumber = formatIntegerWithDecimal(formattedInteger, result[1], '.')

        if (number < 0) {
            number = format['negative_prefix'] + formattedNumber + format['negative_suffix'];
        }
        else {
            number = format['positive_prefix'] + formattedNumber + format['positive_suffix'];
        }
        if (invoice) {
            return number.replace("¤", '\x1B\x74\x13\xD5');
        }
        return number.replace("¤", currencySign);
    }
}


function parseNumber(number) {
    number = Math.abs(number);

    if (format['max_decimal_digits'] >= 0) {
        number = makeTotalProductCaculation(parseFloat(number));
    }
    number = number + '';
    if ((pos = number.indexOf('.')) !== -1) {
        return [number.substring(0, pos), number.substring(pos + 1)];
    }
    return [number, ''];
}
function ltrim(data) {
    var trimmed = data.replace(/^\s+/g, '');
    return trimmed;
};

function padLeft(char, length, data) {
    data = data + '';
    while (data.length < length) {
        data = char + data;
    }
    return data;
}

function formatIntegerWithGroup(integerValue, group_symbol) {
    integerValue += '';
    integerValue = padLeft('0', format['integer_digits'], integerValue) + '';
    var group_size1 = format['group_size1'];

    if (group_size1 < 1 || (integerValue.length) <= format['group_size1']) {
        return integerValue;
    }

    var group_size2 = format['group_size2'];

    var str1 = integerValue.slice(0, -group_size1);
    var str2 = integerValue.slice(-group_size1);
    var size = group_size2 > 0 ? group_size2 : group_size1;

    str1 = padLeft(' ', parseInt(((str1.length) + size - 1) / size) * size, str1) + '';
    if (str1.length >= size) {
        return (ltrim((str1.match(new RegExp('.{' + size + '}', 'g'))).join(group_symbol))) + group_symbol + str2;
    } else {
        return ltrim(str1) + group_symbol + str2;
    }

}

function formatIntegerWithDecimal(integer, decimal, decimal_symbol) {
    integer += '';
    decimal += '';

    if (decimal.length > format['decimal_digits']) {
        decimal = padLeft('0', decimal.length - 1, decimal);
    }

    if (decimal.length > 0) {
        decimal = decimal_symbol + decimal;
    }

    return '' + integer + decimal;
}


export function asyncComputed(evaluator, owner) {
    var result = ko.observable();
    ko.computed(function () {
        var value = evaluator.call(owner);
        if (value instanceof Promise) {
            evaluator.call(owner).then(result);
        }
    });
    return result;
}
