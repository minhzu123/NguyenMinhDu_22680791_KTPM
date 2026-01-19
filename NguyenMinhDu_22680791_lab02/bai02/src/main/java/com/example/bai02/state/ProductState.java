package com.example.bai02.state;

import com.example.bai02.strategy.TaxStrategy;

public interface ProductState {
    TaxStrategy getTaxStrategy();
}