package com.mzu.btkientruc_w3;

public abstract class Book {
    private final String id;
    private final String title;
    private final String author;
    private final String genre;
    private BookStatus status;

    protected Book(String id, String title, String author, String genre) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.status = BookStatus.AVAILABLE;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getGenre() {
        return genre;
    }

    public BookStatus getStatus() {
        return status;
    }

    public boolean isAvailable() {
        return status == BookStatus.AVAILABLE;
    }

    public boolean borrow() {
        if (status == BookStatus.BORROWED) {
            return false;
        }
        status = BookStatus.BORROWED;
        return true;
    }

    public boolean returnBook() {
        if (status == BookStatus.AVAILABLE) {
            return false;
        }
        status = BookStatus.AVAILABLE;
        return true;
    }

    @Override
    public String toString() {
        return String.format("%s{id='%s', title='%s', author='%s', genre='%s', status=%s}",
                getClass().getSimpleName(), id, title, author, genre, status);
    }
}
