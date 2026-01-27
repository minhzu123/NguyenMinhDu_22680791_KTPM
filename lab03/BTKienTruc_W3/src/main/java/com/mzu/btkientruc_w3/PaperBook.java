package com.mzu.btkientruc_w3;

public class PaperBook extends Book {
    private final int pages;

    public PaperBook(String id, String title, String author, String genre, int pages) {
        super(id, title, author, genre);
        this.pages = pages;
    }

    public int getPages() {
        return pages;
    }

    @Override
    public String toString() {
        return String.format("%s, pages=%d}", super.toString().replace("}", ""), pages);
    }
}
