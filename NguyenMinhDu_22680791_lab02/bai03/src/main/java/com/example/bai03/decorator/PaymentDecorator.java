package com.example.bai03.decorator;


import com.example.bai03.strategy.PaymentStrategy;

public abstract class PaymentDecorator implements PaymentStrategy {

    protected PaymentStrategy payment;

    public PaymentDecorator(PaymentStrategy payment) {
        this.payment = payment;
    }
}