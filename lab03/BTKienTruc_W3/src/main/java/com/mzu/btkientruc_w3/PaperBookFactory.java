package com.mzu.btkientruc_w3;

public class PaperBookFactory extends BookFactory {
    private final int pages;

    public PaperBookFactory(int pages) {
        this.pages = pages;
    }

    @Override
    public Book createBook(String id, String title, String author, String genre) {
        return new PaperBook(id, title, author, genre, pages);
    }
}
