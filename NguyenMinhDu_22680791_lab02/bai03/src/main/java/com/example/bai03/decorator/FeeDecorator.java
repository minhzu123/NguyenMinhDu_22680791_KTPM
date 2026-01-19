package com.example.bai03.decorator;

import com.example.bai03.strategy.PaymentStrategy;

public class FeeDecorator extends PaymentDecorator {

    public FeeDecorator(PaymentStrategy payment) {
        super(payment);
    }

    @Override
    public void pay(double amount) {
        System.out.println("➕ Phí xử lý: 10");
        payment.pay(amount + 10);
    }
}