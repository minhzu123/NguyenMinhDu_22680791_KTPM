package minhzu.com.bai01.orders.decorator;

public class Insurance extends OrderDecorator {

    public Insurance(OrderService order) {
        super(order);
    }

    @Override
    public double cost() {
        return order.cost() + 30;
    }
}