package minhzu.com.bai01.orders.decorator;


public class BasicOrder implements OrderService {
    @Override
    public double cost() {
        return 100;
    }
}