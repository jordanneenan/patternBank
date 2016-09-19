<?php
    require('../../../../../wp-load.php');

	$action = $_POST['doAction'];
	$saveName = $_POST['saveID'];
    $fieldData = $_POST['fieldData'];

    $currentTime = time();

    global $wpdb;

    if($action == 'save'){
    	//check if save name exists
	    $datum = $wpdb->get_var( 'SELECT COUNT(name) FROM sg_saves WHERE name = "'.$saveName.'"' );

	    if($datum > 0){
	    	echo 'There is already a save with the name "'.$saveName.'"';
	    }else{
	    	//create new save name in save table
	    	$wpdb->insert( 'sg_saves', array( 'name' => $saveName, 'date' => $currentTime ), array( '%s', '%d' ) );

	    	//get the id of the new save name
	    	$saveId = $wpdb->get_var( 'SELECT id FROM sg_saves WHERE name = "'.$saveName.'"' );

	    	//add save data to the save data table with a referential ID to the save table
	    	foreach($fieldData as $fieldRow){
		    	$wpdb->insert( 'sg_data', array( 'save_id' => $saveId, 'field_value' => $fieldRow ), array( '%d', '%s' ) );
		    }

	    	echo 'Saved';
	    }
    }

    if($action == 'save_over'){

    	//find the id for this name
    	$nameId = $wpdb->get_var( 'SELECT id FROM sg_saves WHERE name = "'.$saveName.'"' );
    	//delete all rows with that id
    	$wpdb->delete( 'sg_data', array( 'save_id' => $nameId ) );
    	//add the new data to the db
    	//add save data to the save data table with a referential ID to the save table
    	foreach($fieldData as $fieldRow){
	    	$wpdb->insert( 'sg_data', array( 'save_id' => $nameId, 'field_value' => $fieldRow ), array( '%d', '%s' ) );
	    }

	    echo 'saved';
    }

    if($action == 'get_save_list'){

    	$names = $wpdb->get_results( 'SELECT name FROM sg_saves' );

    	if($names){
    		echo '<span>Save over:</span>';
    		foreach($names as $name){
    			$name = json_decode(json_encode($name),true);
	    		echo '<div class="save_over_name" data-savedName="'.$name['name'].'">'.$name['name'].'</div>';
	    	}
    	}
    }

?>
