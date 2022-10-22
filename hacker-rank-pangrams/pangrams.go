package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
    "strings"
)

/*
 * Complete the 'pangrams' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

func pangrams(s string) string {
    // Write your code here

    arr := strings.Split( strings.ToLower(s) ,"")

    mymap := make(map[string] string)
    for _,r := range arr {
        mymap[ r ] = r
    }
    delete(mymap, " ")

    if len(mymap)==26 {
        return "pangram"
    }
    return "not pangram"
}

func main() {
    reader := bufio.NewReaderSize(os.Stdin, 16 * 1024 * 1024)

    stdout, err := os.Create(os.Getenv("OUTPUT_PATH"))
    checkError(err)

    defer stdout.Close()

    writer := bufio.NewWriterSize(stdout, 16 * 1024 * 1024)

    s := readLine(reader)

    result := pangrams(s)

    fmt.Fprintf(writer, "%s\n", result)

    writer.Flush()
}

func readLine(reader *bufio.Reader) string {
    str, _, err := reader.ReadLine()
    if err == io.EOF {
        return ""
    }

    return strings.TrimRight(string(str), "\r\n")
}

func checkError(err error) {
    if err != nil {
        panic(err)
    }
}
