<?php

    include("config.php");
    $global_dbh = mysql_connect($hostname, $username, $password)
    or die("Could not connect to database");
    
    mysql_select_db($db)
    or die("Could not select database");

    function display_db_query($query_string, $connection, $header_bool, $table_params) {
        // perform the database query
        $result_id = mysql_query($query_string, $connection)
        or die("display_db_query:" . mysql_error());
        // find out the number of columns in result
        $column_count = mysql_num_fields($result_id)
        or die("display_db_query:" . mysql_error());
        // Here the table attributes from the $table_params variable are added
        print("<TABLE $table_params >\n");
        // optionally print a bold header at top of table
        if($header_bool) {
            print("<TR>");
            for($column_num = 0; $column_num < $column_count; $column_num++) {
                $field_name = mysql_field_name($result_id, $column_num);
                print("<TH>$field_name</TH>");
            }
            print("</TR>\n");
        }
        // print the body of the table
        while($row = mysql_fetch_row($result_id)) {
            print("<TR ALIGN=LEFT VALIGN=TOP>");
            for($column_num = 0; $column_num < $column_count; $column_num++) {
                print("<TD>$row[$column_num]</TD>\n");
            }
            print("</TR>\n");
        }
        print("</TABLE>\n"); 
    }

    /*muestra data de una tabla de la bd*/
    function display_db_table($tablename, $connection, $header_bool, $table_params) {
        $query_string = "SELECT * FROM $tablename";
        display_db_query($query_string, $connection,
        $header_bool, $table_params);
    }
    ?>
    <HTML><HEAD><TITLE>Displaying a MySQL table</TITLE></HEAD>
    <BODY>
    <TABLE><TR><TD>
    <?php
    //In this example the table name to be displayed is  static, but it could be taken from a form
    $table = "user";

    display_db_table($table, $global_dbh,TRUE, "border='2'");
    ?>
    </TD></TR></TABLE></BODY></HTML>