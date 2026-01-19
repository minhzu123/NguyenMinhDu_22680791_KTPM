package com.example.designpatternsingletonfactory;

import com.example.designpatternsingletonfactory.abstractfactory.FantasyGameFactory;
import com.example.designpatternsingletonfactory.abstractfactory.GameFactory;
import com.example.designpatternsingletonfactory.product.GameCharacter;
import com.example.designpatternsingletonfactory.singleton.GameConfig;

public class Main {
    public static void main(String[] args) {

        // Singleton
        GameConfig config = GameConfig.getInstance();
        System.out.println("Game: " + config.getGameName());

        // Abstract Factory
        GameFactory factory = new FantasyGameFactory();

        GameCharacter warrior = factory.createWarrior();
        GameCharacter mage = factory.createMage();

        warrior.attack();
        mage.attack();
    }
}
