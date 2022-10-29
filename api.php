
<?php
$data = json_decode(file_get_contents('db.json'));
switch ($_GET['method']) {
	case 'save':
		if (!empty($_POST['phone']) && !empty($_POST['date'])) {
			$data[]=[$_POST['phone'],$_POST['date']];	
		}
		echo "OK";
		break;
	case 'getDisabled':
		$disabled=[];
		foreach ($data as $key => $row) {
			$disabled[] = $row[1];
		}
		echo json_encode($disabled);
		break;
	default:
		
		break;
}
file_put_contents("db.json", json_encode($data));
?>
