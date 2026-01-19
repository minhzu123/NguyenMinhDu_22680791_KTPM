package minhzu.com.bai01.orders;

import minhzu.com.bai01.orders.decorator.BasicOrder;
import minhzu.com.bai01.orders.decorator.GiftWrap;
import minhzu.com.bai01.orders.decorator.Insurance;
import minhzu.com.bai01.orders.decorator.OrderService;
import minhzu.com.bai01.orders.strategy.FastShipping;
import minhzu.com.bai01.orders.strategy.ShippingStrategy;

public class Main {
    public static void main(String[] args) {

        System.out.println("=== STATE PATTERN ===");
        OrderContext order = new OrderContext();
        order.process();
        order.process();

        System.out.println("\n=== STRATEGY PATTERN ===");
        ShippingStrategy shipping = new FastShipping();
        shipping.ship();

        System.out.println("\n=== DECORATOR PATTERN ===");
        OrderService service = new BasicOrder();
        service = new GiftWrap(service);
        service = new Insurance(service);

        System.out.println("💰 Tổng tiền đơn hàng: " + service.cost());
    }
}