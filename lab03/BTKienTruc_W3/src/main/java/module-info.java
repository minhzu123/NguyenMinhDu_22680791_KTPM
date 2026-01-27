module com.mzu.btkientruc_w3 {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.mzu.btkientruc_w3 to javafx.fxml;
    exports com.mzu.btkientruc_w3;
}