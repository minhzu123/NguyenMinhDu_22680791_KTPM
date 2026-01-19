package com.example.designpatternsingletonfactory.abstractfactory;

import com.example.designpatternsingletonfactory.product.GameCharacter;
import com.example.designpatternsingletonfactory.product.Mage;
import com.example.designpatternsingletonfactory.product.Warrior;

public class FantasyGameFactory implements GameFactory {
    @Override
    public GameCharacter createWarrior() {
        return new Warrior();
    }

    @Override
    public GameCharacter createMage() {
        return new Mage();
    }
}
