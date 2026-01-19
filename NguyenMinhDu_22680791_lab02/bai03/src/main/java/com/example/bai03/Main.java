package com.example.bai03;

import com.example.bai03.decorator.DiscountDecorator;
import com.example.bai03.decorator.FeeDecorator;
import com.example.bai03.state.CompletedState;
import com.example.bai03.state.PaymentState;
import com.example.bai03.state.PendingState;
import com.example.bai03.strategy.CreditCardPayment;
import com.example.bai03.strategy.PaymentStrategy;

public class Main {
    public static void main(String[] args) {

        double amount = 200;

        System.out.println("=== STATE PATTERN ===");
        PaymentState state = new PendingState();
        state.handle();

        state = new CompletedState();
        state.handle();

        System.out.println("\n=== STRATEGY + DECORATOR ===");
        PaymentStrategy payment = new CreditCardPayment();

        payment = new DiscountDecorator(payment);
        payment = new FeeDecorator(payment);

        payment.pay(amount);
    }
}
