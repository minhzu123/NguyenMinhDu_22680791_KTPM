package com.mzu.btkientruc_w3;

public class EBook extends Book {
    private final String format;
    private final double fileSizeMb;

    public EBook(String id, String title, String author, String genre, String format, double fileSizeMb) {
        super(id, title, author, genre);
        this.format = format;
        this.fileSizeMb = fileSizeMb;
    }

    public String getFormat() {
        return format;
    }

    public double getFileSizeMb() {
        return fileSizeMb;
    }

    @Override
    public String toString() {
        return String.format("%s, format='%s', fileSizeMb=%.2f}", super.toString().replace("}", ""), format, fileSizeMb);
    }
}
