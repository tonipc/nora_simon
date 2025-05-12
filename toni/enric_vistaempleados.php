<?php
require dirname(__FILE__) . '/_init.php';

if (!defined('_PS_VERSION_')) {
    die('Not Allowed, root');
}

@error_reporting(E_ALL | E_STRICT);
ini_set("display_errors", 1);

//x la tarde
if(Tools::getValue('tarde')=='si'){
    dump('llega');
    dameEmpleadosDesayunoYAgregalos();
    die;
}

//al mediodia
dameEmpleadosComidaYAgregalos();


function dameEmpleadosDesayunoYAgregalos(){

    //email
    $sql = 'SELECT id_employee, CONCAT(firstname, " ", lastname) as nombre_completo
    FROM '._DB_PREFIX_.'employee
    WHERE (email ="glovo1@norarealfood.com" OR email ="glovo2@norarealfood.com" OR email ="glovo3@norarealfood.com" OR email ="glovo4@norarealfood.com")
    ';
    p($sql);
    $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

    $result = array_column($result, 'id_employee');
    dump($result);

    //por tienda
    $empleados_comida = json_decode(Configuration::get('EMPLEADOS_AUTOPAGO_CAFETERIAS'));
    dump($empleados_comida);
    $diff = array_diff($result, $empleados_comida);
    dump($diff);

    if(count($diff)>0){
        echo 'Difieren...<br/>';

        echo 'Vamos a añadir los EMPLEADOS CAFETERIAS que faltan:<br/>';
        $todos = array_unique(array_merge($result, $empleados_comida));
        sort($todos);
        dump($todos);
    
        $todos_encoded = json_encode($todos);
        Configuration::updateValue('EMPLEADOS_AUTOPAGO_CAFETERIAS', $todos_encoded);

        //y me los quitas de comidas
        $empleados_comida = json_decode(Configuration::get('EMPLEADOS_VISTACLIENTE'));
        dump($empleados_comida);

        echo 'Los quitamos de COMIDA.<br/>';
        foreach ($empleados_comida as $key => $value){
            if(in_array($value, $result)){
               unset($empleados_comida[$key]);
            }
        }
        $empleados_comida_encoded = json_encode(array_values($empleados_comida));
        echo 'Actualizamos var COMIDAS sin las pantallas DESAYUNOS:<br/>';
        dump($empleados_comida_encoded);

        Configuration::updateValue('EMPLEADOS_VISTACLIENTE', $empleados_comida_encoded);

    }else{
        die('No hay EMPLEADOS CAFETERIAS que actualizar');
    }
    
}

function dameEmpleadosComidaYAgregalos(){

    //por ahora son estos
    $sql = 'SELECT id_employee, CONCAT(firstname, " ", lastname) as nombre_completo
    FROM '._DB_PREFIX_.'employee
    WHERE (email ="glovo1@norarealfood.com" OR email ="glovo2@norarealfood.com" OR email ="glovo3@norarealfood.com" OR email ="glovo4@norarealfood.com")
    ';
    $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

    $result = array_column($result, 'id_employee');
    dump($result);

    $empleados_comida = json_decode(Configuration::get('EMPLEADOS_VISTACLIENTE'));
    dump($empleados_comida);

    $diff = array_diff($result, $empleados_comida);
    dump($diff);

    if(count($diff)>0){
        echo 'Difieren...<br/>';
        echo 'Vamos a añadir los EMPLEADOS COMIDAS que faltan...<br/>';

        $todos = array_unique(array_merge($result, $empleados_comida));
        sort($todos);
        dump($todos);
    
        $todos_encoded = json_encode($todos);
        Configuration::updateValue('EMPLEADOS_VISTACLIENTE', $todos_encoded);

        //y me los quitas de desayunos
        $empleados_desayunos = json_decode(Configuration::get('EMPLEADOS_AUTOPAGO_CAFETERIAS'));
        dump($empleados_desayunos);

        echo 'Los quitamos de DESAYUNOS.<br/>';
        foreach ($empleados_desayunos as $key => $value){
            if(in_array($value, $result)){
                unset($empleados_desayunos[$key]);
            }
        }
        $empleados_desayunos_encoded = json_encode(array_values($empleados_desayunos));
        echo 'Actualizamos var DESAYUNOS sin las pantallas COMIDA:<br/>';
        dump($empleados_desayunos_encoded);

        Configuration::updateValue('EMPLEADOS_AUTOPAGO_CAFETERIAS', $empleados_desayunos_encoded);


    }else{
        die('No hay EMPLEADOS COMIDAS que actualizar');
    }
    

}

function p($data){
    echo '<pre>';
    print_r($data);
    echo '</pre>';

}
