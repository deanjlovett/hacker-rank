import Foundation

/*
 * Complete the 'pangrams' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

func pangrams(s: String) -> String {
    // Write your code here
    let alphabet_count = 26
    
    let arr = Array( s.lowercased() )
    var mydict = [Character : Character]() 
    
    for e in arr where e != " " {
        mydict[ e ] = e
    }
    return myd.count == alphabet_count ? "pangram" : "not pangram"
}

/*
 * driver 
 */

guard let s = readLine() else { fatalError("Bad input") }
let result = pangrams(s: s)

if( ProcessInfo.processInfo.environment["OUTPUT_PATH"] ){
    let stdout = ProcessInfo.processInfo.environment["OUTPUT_PATH"]!
    FileManager.default.createFile(atPath: stdout, contents: nil, attributes: nil)
    let fileHandle = FileHandle(forWritingAtPath: stdout)!
    fileHandle.write(result.data(using: .utf8)!)
    fileHandle.write("\n".data(using: .utf8)!)
}else{
    print(result.data(using: .utf8)!)
    print("\n".data(using: .utf8)!)
}
