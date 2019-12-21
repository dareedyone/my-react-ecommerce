<?php require_once('const.php') ?>

<?php
class Database {
 public $conn;

function __construct () {
    $this->open_connection();
    // echo 'instantiated';
}

   public function open_connection() {
$this->conn = new mysqli(SERVER_NAME, USER_NAME, PASSWORD, DB_NAME);
if ($this->conn->connect_error) {
    die("Database connection failed".$this->conn->connect_error );
}
   }

   public function close_connection() {
       if (isset($this->conn)) {
           $this->conn->close();
           unset($this->conn);
       }
   }

//    public function return_conn() {
//        return $this->conn;
//    }
}

$database = new Database();

?>