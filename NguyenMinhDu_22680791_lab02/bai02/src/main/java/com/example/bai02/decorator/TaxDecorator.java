package com.example.bai02.decorator;


import com.example.bai02.strategy.TaxStrategy;

public abstract class TaxDecorator implements TaxStrategy {

    protected TaxStrategy tax;

    public TaxDecorator(TaxStrategy tax) {
        this.tax = tax;
    }
}