import java.util.Scanner;

public class BinaryStringsRecursive {

    // Recursive function to generate binary strings
    public static void generateBinary(int n, String current) {
        // 1. Base Case: The string has reached length N
        if (current.length() == n) {
            System.out.println(current);
            return;
        }

        // --- CHOICE 1: Place '0' at current position ---
        generateBinary(n, current + "0");

        // --- CHOICE 2: Place '1' at current position ---
        generateBinary(n, current + "1");
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter length N of binary strings: ");
        int n = scanner.nextInt();

        if (n <= 0) {
            System.out.println("Please enter a positive integer greater than 0.");
        } else {
            System.out.println("All binary strings of length " + n + ":");
            // Start recursion with an empty string
            generateBinary(n, "");
        }

        scanner.close();
    }
}
