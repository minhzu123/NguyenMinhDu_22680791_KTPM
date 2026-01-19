package com.example.bai02.state;

import com.example.bai02.strategy.TaxStrategy;
import com.example.bai02.strategy.VATTax;

public class NormalProduct implements ProductState {
    @Override
    public TaxStrategy getTaxStrategy() {
        return new VATTax();
    }
}