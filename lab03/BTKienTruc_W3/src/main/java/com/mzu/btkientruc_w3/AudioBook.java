package com.mzu.btkientruc_w3;

public class AudioBook extends Book {
    private final int durationMinutes;
    private final String narrator;

    public AudioBook(String id, String title, String author, String genre, int durationMinutes, String narrator) {
        super(id, title, author, genre);
        this.durationMinutes = durationMinutes;
        this.narrator = narrator;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public String getNarrator() {
        return narrator;
    }

    @Override
    public String toString() {
        return String.format("%s, durationMinutes=%d, narrator='%s'}",
                super.toString().replace("}", ""), durationMinutes, narrator);
    }
}
