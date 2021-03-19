export interface ITestResult {
    passed: boolean,
    message: string
}

export interface IFeedback {
    message: string,
    testResults : ITestResult[]
}
