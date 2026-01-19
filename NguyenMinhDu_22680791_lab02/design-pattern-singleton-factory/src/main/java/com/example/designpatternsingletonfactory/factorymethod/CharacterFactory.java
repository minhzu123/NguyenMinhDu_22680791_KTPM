package com.example.designpatternsingletonfactory.factorymethod;

import com.example.designpatternsingletonfactory.product.GameCharacter;

public abstract class CharacterFactory {
    public abstract GameCharacter createCharacter();
}