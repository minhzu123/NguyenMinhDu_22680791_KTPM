package com.mzu.btkientruc_w3;

import java.util.List;

public class LibraryDemo {
    public static void main(String[] args) {
        Library library = Library.getInstance();

        BookFactory paperFactory = new PaperBookFactory(320);
        BookFactory ebookFactory = new EBookFactory("PDF", 2.5);
        BookFactory audioFactory = new AudioBookFactory(540, "John Doe");

        library.addBook(paperFactory.createBook("B001", "Clean Code", "Robert C. Martin", "Software"));
        library.addBook(ebookFactory.createBook("B002", "Design Patterns", "Erich Gamma", "Software"));
        library.addBook(audioFactory.createBook("B003", "The Pragmatic Programmer", "Andrew Hunt", "Software"));

        library.borrowBook("B002");

        System.out.println("Available books:");
        printBooks(library.listAvailableBooks());

        System.out.println("\nSearch by title 'design':");
        printBooks(library.searchByTitle("design"));

        library.returnBook("B002");
        System.out.println("\nAll books:");
        printBooks(library.listAllBooks());
    }

    private static void printBooks(List<Book> books) {
        if (books.isEmpty()) {
            System.out.println("(none)");
            return;
        }
        for (Book book : books) {
            System.out.println("- " + book);
        }
    }
}
