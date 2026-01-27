package com.mzu.btkientruc_w3;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

public class Library {
    private static volatile Library instance;

    private final List<Book> books;

    private Library() {
        books = new ArrayList<>();
    }

    public static Library getInstance() {
        if (instance == null) {
            synchronized (Library.class) {
                if (instance == null) {
                    instance = new Library();
                }
            }
        }
        return instance;
    }

    public void addBook(Book book) {
        books.add(book);
    }

    public boolean borrowBook(String id) {
        Optional<Book> book = findById(id);
        return book.map(Book::borrow).orElse(false);
    }

    public boolean returnBook(String id) {
        Optional<Book> book = findById(id);
        return book.map(Book::returnBook).orElse(false);
    }

    public List<Book> listAvailableBooks() {
        return books.stream()
                .filter(Book::isAvailable)
                .collect(Collectors.toUnmodifiableList());
    }

    public List<Book> listAllBooks() {
        return Collections.unmodifiableList(books);
    }

    public List<Book> searchByTitle(String titleKeyword) {
        return searchByField(titleKeyword, Book::getTitle);
    }

    public List<Book> searchByAuthor(String authorKeyword) {
        return searchByField(authorKeyword, Book::getAuthor);
    }

    public List<Book> searchByGenre(String genreKeyword) {
        return searchByField(genreKeyword, Book::getGenre);
    }

    private Optional<Book> findById(String id) {
        return books.stream()
                .filter(book -> book.getId().equalsIgnoreCase(id))
                .findFirst();
    }

    private List<Book> searchByField(String keyword, java.util.function.Function<Book, String> getter) {
        String normalized = normalize(keyword);
        return books.stream()
                .filter(book -> normalize(getter.apply(book)).contains(normalized))
                .collect(Collectors.toUnmodifiableList());
    }

    private String normalize(String text) {
        return text == null ? "" : text.toLowerCase(Locale.ROOT).trim();
    }
}
