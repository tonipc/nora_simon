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

export function createIndexDBConnection(dbName, dbVersion = 1) {
    // In the following line, you should include the prefixes of implementations you want to test.
    // window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // DON'T use "var indexedDB = ..." if you're not in a function.
    // Moreover, you may need references to some window.IDB* objects:
    // window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
    // window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
    // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }

    dbRequest = window.indexedDB.open(dbName, dbVersion);

    dbRequest.onsuccess = function (event) {
    };

    dbRequest.onupgradeneeded = function (event) {
        var db = event.target.result;
        db.createObjectStore('pos_products', { keyPath: "id" });
    }

    dbRequest.onerror = function (event) {
        // Do something with dbRequest.errorCode!
    };

    // db = dbRequest.result;
    // db.createObjectStore('pos_products', { keyPath: "id" });
    // db.createObjectStore('pos_cart', { keyPath: "cartIndex" });

    // dbRequest.onupgradeneeded = function(event) {
    //     objectStore.transaction.oncomplete = function(event) {
    //         // Store values in the newly created objectStore.
    //         var productObjectStore = db.transaction("pos_products", "readwrite").objectStore("pos_products");
    //         $.each(products, function(index, product) {
    //             productObjectStore.add(product);
    //         });
    //     };
    // };
    // return dbRequest;
}
// }
