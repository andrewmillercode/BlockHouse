import os
import json
from django.http import JsonResponse
from django.conf import settings

currentDirectory = os.path.dirname(__file__)

def returnChartJsonData(request,chartType):
    """
    Returns chart data in JSON format based on the chart type.
    """
    try:
        with open(os.path.join(currentDirectory, 'data.json'), 'r') as json_file:
            data = json.load(json_file)
            match chartType:
                case "candlestick-data":
                    return JsonResponse(data["candlestickChartData"])
                case "line-chart-data":
                    return JsonResponse(data["lineChartData"])
                case "bar-chart-data":
                    return JsonResponse(data["barChartData"])
                case "pie-chart-data":
                    return JsonResponse(data["pieChartData"])
                case _:
                    return JsonResponse({"error": "Invalid chart type"})
    except:
        return JsonResponse({"error": "Invalid chart type"})