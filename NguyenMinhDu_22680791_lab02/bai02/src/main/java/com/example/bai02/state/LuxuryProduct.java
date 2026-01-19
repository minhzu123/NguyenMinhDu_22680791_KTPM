package com.example.bai02.state;

import com.example.bai02.decorator.SpecialTax;
import com.example.bai02.strategy.LuxuryTax;
import com.example.bai02.strategy.TaxStrategy;

public class LuxuryProduct implements ProductState {
    @Override
    public TaxStrategy getTaxStrategy() {
        return new SpecialTax(new LuxuryTax());
    }
}