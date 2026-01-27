package com.mzu.btkientruc_w3;

public class AudioBookFactory extends BookFactory {
    private final int durationMinutes;
    private final String narrator;

    public AudioBookFactory(int durationMinutes, String narrator) {
        this.durationMinutes = durationMinutes;
        this.narrator = narrator;
    }

    @Override
    public Book createBook(String id, String title, String author, String genre) {
        return new AudioBook(id, title, author, genre, durationMinutes, narrator);
    }
}
