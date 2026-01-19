package com.example.designpatternsingletonfactory.factorymethod;

import com.example.designpatternsingletonfactory.product.GameCharacter;
import com.example.designpatternsingletonfactory.product.Mage;

public class MageFactory extends CharacterFactory {
    @Override
    public GameCharacter createCharacter() {
        return new Mage();
    }
}
