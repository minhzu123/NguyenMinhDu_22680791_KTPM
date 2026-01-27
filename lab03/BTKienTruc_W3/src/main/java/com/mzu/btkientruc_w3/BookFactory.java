package com.mzu.btkientruc_w3;

public abstract class BookFactory {
    public abstract Book createBook(String id, String title, String author, String genre);
}
