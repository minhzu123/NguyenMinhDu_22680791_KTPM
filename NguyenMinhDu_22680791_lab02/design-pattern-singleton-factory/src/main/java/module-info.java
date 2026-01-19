module com.example.designpatternsingletonfactory {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.designpatternsingletonfactory to javafx.fxml;
    exports com.example.designpatternsingletonfactory;
}