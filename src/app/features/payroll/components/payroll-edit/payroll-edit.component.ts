import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayrollService } from 'src/app/core/services/payroll/payroll.service';
import { Payroll } from 'src/app/features/payroll/models/payroll.model';

@Component({
  selector: 'app-payroll-edit',
  templateUrl: './payroll-edit.component.html',
  styleUrls: ['./payroll-edit.component.css']
})
export class PayrollEditComponent implements OnInit {
  payroll: Payroll | null = null;

  constructor(
    private route: ActivatedRoute,
    private payrollService: PayrollService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const payrollId = this.route.snapshot.paramMap.get('id');
  
    if (payrollId) {
      this.payrollService.getPayrollById(payrollId).subscribe(
        (data) => {
          //Formatage de la date pour compatibilité avec <input type="date">
          if (data.payDate) {
            data.payDate = new Date(data.payDate).toISOString().split('T')[0];
          }
  
          this.payroll = data; // Assigner les données formatées à l'objet payroll
        },
        (error) => {
          console.error('Erreur lors de la récupération de la fiche de paie', error);
          this.router.navigate(['/admin/payrolls'], { queryParams: { error: 'true' } });
        }
      );
    } else {
      console.error('ID de la fiche de paie introuvable');
      this.router.navigate(['/admin/payrolls']);
    }
  }
  
  
  

  onSubmit(): void {
    if (this.payroll && this.payroll.id) {
      // Utilisez directement l'ID tel quel, sans le convertir en nombre
      this.payrollService.updatePayroll(this.payroll.id, this.payroll).subscribe(
        (response) => {
          console.log('Fiche de paie mise à jour avec succès', response);
          this.router.navigate(['/admin/payrolls']); // Redirige après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la fiche de paie', error);
        }
      );
    } else {
      console.error('ID de la fiche de paie non défini');
    }
  }
  
  
}
