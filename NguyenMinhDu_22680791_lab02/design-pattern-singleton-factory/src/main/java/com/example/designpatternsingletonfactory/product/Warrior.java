package com.example.designpatternsingletonfactory.product;

public class Warrior implements GameCharacter {
    @Override
    public void attack() {
        System.out.println("⚔️ Warrior tấn công bằng kiếm");
    }
}