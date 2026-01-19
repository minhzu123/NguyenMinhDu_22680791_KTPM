package com.example.designpatternsingletonfactory.singleton;

public class GameConfig {

    private static GameConfig instance;

    private String gameName;

    private GameConfig() {
        gameName = "Fantasy World";
    }

    public static GameConfig getInstance() {
        if (instance == null) {
            instance = new GameConfig();
        }
        return instance;
    }

    public String getGameName() {
        return gameName;
    }
}
