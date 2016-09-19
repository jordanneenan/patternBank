<?php
    require('../../../../../wp-load.php');

	$action = $_POST['doAction'];
    $currentTime = time();

    global $wpdb;

    if($action == 'get_load_list'){
    	$names = $wpdb->get_results( 'SELECT name FROM sg_saves' );

    	if($names){
    		echo '<span>Load:</span>';
    		foreach($names as $name){
    			$name = json_decode(json_encode($name),true);
	    		echo '<div class="load_name" data-loadName="'.$name['name'].'">'.$name['name'].'</div>';
	    	}
    	}
    }

    if($action == 'load_in'){
        $loadName = $_POST['loadID'];
        $loadID = $wpdb->get_var( 'SELECT id FROM sg_saves WHERE name = "'.$loadName.'"' );
        $values = $wpdb->get_results( 'SELECT field_value FROM sg_data WHERE save_id = "'.$loadID.'"' );

        if($values){
            $i = 0;
            $returnArray = '[';
            foreach($values as $value){
                $value = json_decode(json_encode($value),true);

                if($i == 0){
                    $returnArray .= '"'.$value['field_value'].'"';
                }else{
                    $returnArray .= ', "'.$value['field_value'].'"';
                }
                    
                $i++;
            }

            $returnArray .= ']';
            echo $returnArray;
        }
    }

?>
