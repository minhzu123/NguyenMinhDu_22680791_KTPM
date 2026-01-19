package com.example.designpatternsingletonfactory.factorymethod;

import com.example.designpatternsingletonfactory.product.GameCharacter;
import com.example.designpatternsingletonfactory.product.Warrior;

public class WarriorFactory extends CharacterFactory {
    @Override
    public GameCharacter createCharacter() {
        return new Warrior();
    }
}
