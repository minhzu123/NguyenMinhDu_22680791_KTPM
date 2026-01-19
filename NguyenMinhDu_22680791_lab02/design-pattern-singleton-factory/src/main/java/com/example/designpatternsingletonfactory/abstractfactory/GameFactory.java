package com.example.designpatternsingletonfactory.abstractfactory;

import com.example.designpatternsingletonfactory.product.GameCharacter;

public interface GameFactory {
    GameCharacter createWarrior();
    GameCharacter createMage();
}
