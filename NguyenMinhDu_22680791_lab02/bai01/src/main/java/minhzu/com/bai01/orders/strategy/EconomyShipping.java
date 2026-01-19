package minhzu.com.bai01.orders.strategy;

public class EconomyShipping implements ShippingStrategy {
    @Override
    public void ship() {
        System.out.println("🐢 Vận chuyển tiết kiệm");
    }
}