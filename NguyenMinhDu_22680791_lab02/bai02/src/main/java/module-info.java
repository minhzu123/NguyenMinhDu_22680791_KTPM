module com.example.bai02 {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.bai02 to javafx.fxml;
    exports com.example.bai02;
}