package com.example.bai03.strategy;

public class PaypalPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("🅿️ Thanh toán bằng PayPal: " + amount);
    }
}