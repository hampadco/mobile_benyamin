namespace mobile_benyamin.Models;

public class SearchCargoRequest
{
    public string Origin { get; set; } = string.Empty;
    public string Destination { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public string VehicleType { get; set; } = string.Empty;
    public string CargoType { get; set; } = string.Empty;
} 