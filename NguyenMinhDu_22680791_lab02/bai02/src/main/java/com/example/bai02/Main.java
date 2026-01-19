package com.example.bai02;

import com.example.bai02.state.LuxuryProduct;
import com.example.bai02.state.NormalProduct;
import com.example.bai02.state.ProductState;
import com.example.bai02.strategy.TaxStrategy;

public class Main {
    public static void main(String[] args) {

        double price = 1000;

        System.out.println("=== SẢN PHẨM THƯỜNG ===");
        ProductState normal = new NormalProduct();
        TaxStrategy normalTax = normal.getTaxStrategy();
        System.out.println("Thuế: " + normalTax.calculate(price));

        System.out.println("\n=== SẢN PHẨM XA XỈ ===");
        ProductState luxury = new LuxuryProduct();
        TaxStrategy luxuryTax = luxury.getTaxStrategy();
        System.out.println("Thuế: " + luxuryTax.calculate(price));
    }
}