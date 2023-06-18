    <?php 
        ini_set( 'display_errors', 1 );
        error_reporting( E_ALL );
        $from = "gab.perez.py@gmail.com";
        $to = "gab.perez.py@gmail.com";
        $subject = "PHP Mail Test script";
        $message = "This is a test to check the PHP Mail functionality";
        $headers = "From:" . $from;
        //$errorMessage = null;
        if (mail($to,$subject,$message, $headers))
            echo "Test email sent";
        else{
            $errors = error_get_last();
            echo $errors;
            $errorMessage = $errors['message'];
            echo "Test email error: \n" . $errorMessage;
        }
    ?>