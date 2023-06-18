<?php
function nl($string) {
  if(isset($_SERVER['SHELL'])) return preg_replace('/\<br(\s*)?\/?\>/i', PHP_EOL, $string);
  return nl2br($string);
}

function test_nl(){
	print nl("One\nTwo<br>Three\r\nFour<br />Five
Six" . PHP_EOL);
}

function test_get_nl(){
	return nl("One\nTwo<br>Three\r\nFour<br />Five
Six" . PHP_EOL);
}

?>