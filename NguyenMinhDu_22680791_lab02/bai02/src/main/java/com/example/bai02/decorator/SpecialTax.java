package com.example.bai02.decorator;

import com.example.bai02.strategy.TaxStrategy;

public class SpecialTax extends TaxDecorator {

    public SpecialTax(TaxStrategy tax) {
        super(tax);
    }

    @Override
    public double calculate(double price) {
        return tax.calculate(price) + 50;
    }
}