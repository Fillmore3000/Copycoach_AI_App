"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopykittInfraStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const apiGateway = require("aws-cdk-lib/aws-apigateway");
const dotenv = require("dotenv");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
dotenv.config();
class CopykittInfraStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        var _a;
        super(scope, id, props);
        const layer = new lambda.LayerVersion(this, "BaseLayer", {
            code: lambda.Code.fromAsset("lambda_base_layer/layer.zip"),
            compatibleRuntimes: [lambda.Runtime.PYTHON_3_9],
        });
        const apiLambda = new lambda.Function(this, "ApiFunction", {
            runtime: lambda.Runtime.PYTHON_3_9,
            code: lambda.Code.fromAsset("../app/"),
            handler: "copykitt_api.handler",
            layers: [layer],
            environment: {
                OPENAI_API_KEY: (_a = process.env.OPENAI_API_KEY) !== null && _a !== void 0 ? _a : "",
            },
        });
        const copyKittApi = new apiGateway.RestApi(this, "RestApi", {
            restApiName: "CopyKitt Tutorial API",
        });
        copyKittApi.root.addProxy({
            defaultIntegration: new apiGateway.LambdaIntegration(apiLambda),
        });
    }
}
exports.CopykittInfraStack = CopykittInfraStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weWtpdHQtaW5mcmEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3B5a2l0dC1pbmZyYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBZ0Q7QUFFaEQsaURBQWlEO0FBQ2pELHlEQUF5RDtBQUN6RCxpQ0FBaUM7QUFDakMsOENBQThDO0FBRTlDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQixNQUFhLGtCQUFtQixTQUFRLG1CQUFLO0lBQzNDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7O1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBR3hCLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ3ZELElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQztZQUMxRCxrQkFBa0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1NBQ2hELENBQUMsQ0FBQztRQUVILE1BQU0sU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3pELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVU7WUFDbEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUN0QyxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNmLFdBQVcsRUFBRTtnQkFDWCxjQUFjLFFBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLG1DQUFJLEVBQUU7YUFDakQ7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUMxRCxXQUFXLEVBQUUsdUJBQXVCO1NBQ3JDLENBQUMsQ0FBQztRQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3hCLGtCQUFrQixFQUFFLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztTQUNoRSxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUE1QkQsZ0RBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0ICogYXMgYXBpR2F0ZXdheSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXlcIjtcbmltcG9ydCAqIGFzIGRvdGVudiBmcm9tIFwiZG90ZW52XCI7XG4vLyBpbXBvcnQgKiBhcyBzcXMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNxcyc7XG5cbmRvdGVudi5jb25maWcoKTtcblxuZXhwb3J0IGNsYXNzIENvcHlraXR0SW5mcmFTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgIFxuICAgIGNvbnN0IGxheWVyID0gbmV3IGxhbWJkYS5MYXllclZlcnNpb24odGhpcywgXCJCYXNlTGF5ZXJcIiwge1xuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KFwibGFtYmRhX2Jhc2VfbGF5ZXIvbGF5ZXIuemlwXCIpLFxuICAgICAgY29tcGF0aWJsZVJ1bnRpbWVzOiBbbGFtYmRhLlJ1bnRpbWUuUFlUSE9OXzNfOV0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBhcGlMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiQXBpRnVuY3Rpb25cIiwge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuUFlUSE9OXzNfOSxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldChcIi4uL2FwcC9cIiksXG4gICAgICBoYW5kbGVyOiBcImNvcHlraXR0X2FwaS5oYW5kbGVyXCIsXG4gICAgICBsYXllcnM6IFtsYXllcl0sXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBPUEVOQUlfQVBJX0tFWTogcHJvY2Vzcy5lbnYuT1BFTkFJX0FQSV9LRVkgPz8gXCJcIixcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb3B5S2l0dEFwaSA9IG5ldyBhcGlHYXRld2F5LlJlc3RBcGkodGhpcywgXCJSZXN0QXBpXCIsIHtcbiAgICAgIHJlc3RBcGlOYW1lOiBcIkNvcHlLaXR0IFR1dG9yaWFsIEFQSVwiLFxuICAgIH0pO1xuXG4gICAgY29weUtpdHRBcGkucm9vdC5hZGRQcm94eSh7XG4gICAgICBkZWZhdWx0SW50ZWdyYXRpb246IG5ldyBhcGlHYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGFwaUxhbWJkYSksXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==