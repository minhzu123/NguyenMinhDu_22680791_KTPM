package com.mzu.btkientruc_w3;

public class EBookFactory extends BookFactory {
    private final String format;
    private final double fileSizeMb;

    public EBookFactory(String format, double fileSizeMb) {
        this.format = format;
        this.fileSizeMb = fileSizeMb;
    }

    @Override
    public Book createBook(String id, String title, String author, String genre) {
        return new EBook(id, title, author, genre, format, fileSizeMb);
    }
}
