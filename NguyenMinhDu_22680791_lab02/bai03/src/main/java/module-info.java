module com.example.bai03 {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.bai03 to javafx.fxml;
    exports com.example.bai03;
}