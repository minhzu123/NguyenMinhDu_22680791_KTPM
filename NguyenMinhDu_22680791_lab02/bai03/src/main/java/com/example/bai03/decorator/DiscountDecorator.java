package com.example.bai03.decorator;

import com.example.bai03.strategy.PaymentStrategy;

public class DiscountDecorator extends PaymentDecorator {

    public DiscountDecorator(PaymentStrategy payment) {
        super(payment);
    }

    @Override
    public void pay(double amount) {
        System.out.println("➖ Giảm giá: 20");
        payment.pay(amount - 20);
    }
}